const { sequelize, Sequelize : { QueryTypes } } = require("./index");
const { parseDate, getBrowserId } = require('../lib/common'); // 날짜 분해 
const logger = require("../lib/logger");
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');
const pagination = require('pagination');
const fileUpload = require('./file_upload');

/**
* 게시판 Model
*
*/
const board = {
/**
	* 게시글 목록 
	*
	* @param String boardId 게시판아이디
	* @param Integer page 페이지 번호, 기본값은 1 
	* @param Integer limit 1페이지당 출력 레코드 수 
	* @param Object qs URL 쿼리 스트링
	*
	* @return Object
	*/
	getList : async function(boardId, page, limit, qs) {
		page = page || 1;
		limit = limit || 20;
		
		const offset = (page - 1) * limit;
		let prelink = "/board/list/" + boardId;
		if (!boardId) { // 게시판 아이디가 없으면 검색 페이지 
			prelink = "/board/search";
		}
		
		if (qs) {
			const addQuery = [];
			for (key in qs) {
				if (key == 'page') continue;
				
				addQuery.push(`${key}=${qs[key]}`);
			}
			
			prelink += "?" + addQuery.join("&");
		}
		
		const replacements = {};
		if (boardId) {
			replacements.boardId = boardId;
		}
		
		let addWhere = "";

		if (boardId) {
			addWhere = "a.boardId = :boardId";
			if (this._addWhere.binds.length > 0) addWhere += " AND ";
		}
		
		if (this._addWhere.binds && this._addWhere.binds.length > 0) { // 추가 검색 조건이 있는 경우 
			addWhere = this._addWhere.binds.join(" AND ");
			
			if (this._addWhere.params) {
				const params = this._addWhere.params;
				for (key in params) {
					replacements[key] = params[key];
				}
			}
		} // endif 
		
		let sql = `SELECT COUNT(*) as cnt FROM boarddata AS a 
								LEFT JOIN member AS b ON a.memNo = b.memNo 
							WHERE ${addWhere}`;
		let rows = await sequelize.query(sql, {
			replacements, 
			type : QueryTypes.SELECT,
		});
		
		const totalResult = rows[0].cnt;
		const paginator = pagination.create('search', {prelink, current: page, rowsPerPage: limit, totalResult });
		
		
		replacements.offset = offset;
		replacements.limit = limit;
		sql = `SELECT a.*, b.memNm, b.memId FROM boarddata AS a 
							LEFT JOIN member AS b ON a.memNo = b.memNo 
						WHERE ${addWhere} LIMIT :offset, :limit`;
		const list  = await sequelize.query(sql, {
			replacements,
			type : QueryTypes.SELECT,
		});	
		
		list.forEach(async (v, i, _list) => {
			/** new 아이콘 처리 */
			const registerStamp = new Date(v.regDt).getTime();
			const stamp = new Date().getTime() - (60 * 60 * 24 * 1000);
			if (registerStamp > stamp) { // 현재 등록된 게시글이 하루 동안 작성된 경우 -> 새글 
				_list[i].isNew = true;
			}
			const date = parseDate(v.regDt);
			_list[i].regDt = date.datetime;
			_list[i].regDtS = date.date;
			
			/** 조회수 처리 */
			_list[i].viewCountStr = v.viewCount.toLocaleString();
			
			/** 본문에 포함된 이미지 추출 */
			const pattern = /<img[^>]*src=['"]?([^>'"]+)['"]?[^>]*>/igm
			const match = pattern.exec(v.contents);
			if (match && match.length > 0) {
				_list[i].listImage = match[1];
			}
			
			_list[i].listImage = _list[i].listImage || "/img/no_image.png";
		});
		
		const result = {
			pagination : paginator.render(),
			list,
			offset, 
			page,
			totalResult,
			limit,
		};
		
		return result;
	},
	/**
	* 댓글 작성 
	*
	* @return Integer|Boolean 작성 성공시 -> 등록번호(idx), 실패시에는 false
	*/
	writeComment : async function() {
		try {
			const memNo = this.session.memNo || 0;
			let hash = "";
			if (!memNo && this.params.password) {
				hash = await bcrypt.hash(this.params.password, 10);
			}
			
			const sql = `INSERT INTO boardcomment (idxBoard, memNo, poster, password, comment)
									VALUES (:idxBoard, :memNo, :poster, :password, :comment)`;
			
			const replacements = {
				idxBoard : this.params.idxBoard,
				memNo,
				poster : this.params.poster,
				password : hash,
				comment : this.params.comment,
			};
			
			const result = await sequelize.query(sql, {
				replacements,
				type : QueryTypes.INSERT,
			});
			
			 // 게시글 댓글 갯수 업데이트 
			await this.updateCommentCount(this.params.idxBoard); 
			
			return result[0];
		} catch (err) {
			logger(err.stack, 'error');
			return false;
		}
	},
	/**
	* 댓글 수정 
	*
	* @return Boolean
	*/
	updateComment : async function() {
		try {
			const data = await this.getComment(this.params.idx);
			if (!data.idx) {
				throw new Error('댓글이 존재하지 않습니다.');
			}
			
			let hash = "";
			if (!data.memNo && this.params.password) {
				hash = await bcrypt.hash(this.params.password, 10);
			}
			
			const sql = `UPDATE boardcomment
									SET 
										poster = :poster,
										password = :password,
										comment = :comment
								WHERE 
										idx = :idx`;
			
			const replacements = {
				poster : this.params.poster,
				password : hash,
				comment : this.params.comment,
				idx : this.params.idx,
			};
			await sequelize.query(sql, {
				replacements, 
				type : QueryTypes.UPDATE,
			});
			
			 // 게시글 댓글 갯수 업데이트 
			await this.updateCommentCount(data.idxBoard); 
			
			return true;
		} catch (err) {
			logger(err.stack, 'error');
			return false;
		}
	},
	/**
	* 게시글별 댓글 목록 
	*
	* @param Integer idxBoard 게시글 번호 
	* @return Array
	*/
	getComments : async function(idxBoard, req) {
		try {
			const sql = `SELECT a.*, b.memNm, b.memId FROM boardcomment AS a 
									LEFT JOIN member AS b ON a.memNo = b.memNo 
								WHERE idxBoard = ?`;
			
			const rows = await sequelize.query(sql, {
				replacements : [idxBoard],
				type : QueryTypes.SELECT,
			});
			
			rows.forEach((v, i, _rows) => {
				_rows[i].regDt = parseDate(v.regDt).datetime;
				_rows[i].commentHtml = v.comment.replace(/\r\n/g, "<br>");
				
				_rows[i].isWritable = _rows[i].isDeletable = false;
				if (req && req.isLogin && v.memNo && req.session.memNo == v.memNo) { // 회원 댓글일때 본인 댓글만 가능
					_rows[i].isWritable = _rows[i].isDeletable  = true;
				}
				
				if (!v.memNo) { // 비회원은 비밀번호 체크를 하기 위해 버튼 모두 노출
					_rows[i].isWritable = _rows[i].isDeletable  = true;
				}
			});
			
			return rows;
		} catch (err) {
			logger(err.stack, 'error');
			return [];
		}
	},
	/**
	* 댓글 조회 
	* 
	* @param Integer idx 댓글 등록번호
	* @return Object
	*/
	getComment : async function(idx) {
		try {
			const sql = `SELECT a.*, b.memNm, b.memId, c.boardId FROM boardcomment AS a 
									INNER JOIN boarddata as c ON a.idxBoard = c.idx 
									LEFT JOIN member AS b ON a.memNo = b.memNo 
								WHERE a.idx = ?`;
			const rows = await sequelize.query(sql, {
				replacements : [idx],
				type : QueryTypes.SELECT,
			});
			
			const data = rows[0] || {};
			if (data.idx) {
				data.config = await this.getBoard(data.boardId);
			}
					
			return data;
		} catch(err) {
			logger(err.stack, 'error');
			return {};
		}
	},
	/**
	* 댓글 삭제 
	*
	* @param Integer idx 댓글 등록번호
	* @return Boolean 
	*/
	deleteComment : async function(idx) {
		try {
			const data = await board.getComment(idx);
			
			const sql = 'DELETE FROM boardcomment WHERE idx = ?';
			await sequelize.query(sql, {
				replacements : [idx],
				type : QueryTypes.DELETE,
			});
			
			// 게시글 댓글 갯수 업데이트 
			await this.updateCommentCount(data.idxBoard); 
			
			return true;
		} catch(err) {
			logger(err.stack, 'error');
			return false;
		}
	},
	/**
	* 댓글 갯수 
	*
	* @param Integer idx 게시글 번호 
	* @return Integer 댓글 갯수 
	*/
	getCommentCount : async function(idx) {
		try {
			const sql = "SELECT COUNT(*) as cnt FROM boardcomment WHERE idxBoard = ?";
			const rows = await sequelize.query(sql, {
					replacements : [idx],
					type : QueryTypes.SELECT,
			});
			return rows[0].cnt;
		} catch (err) {
			logger(err.stack, 'error');
			return 0;
		}
	},
	/**
	* 게시글에 댓글 갯수를 업데이트 
	*
	* @param Integer idxBoard 게시글 번호
	*/
	updateCommentCount : async function (idxBoard) {
		try {
			const cnt = await this.getCommentCount(idxBoard);
			const sql = `UPDATE boarddata 
									SET commentCount = :commentCount 
								WHERE 
									idx = :idx`;
			const replacements = {
					commentCount : cnt,
					idx : idxBoard,
			};

			await sequelize.query(sql, {
				replacements,
				type : QueryTypes.UPDATE,
			});
			
		} catch (err) {
			logger(err.stack, 'error');
		}
	},
	/**
	* 게시글 조회수 업데이트 
	*
	* @param Integer idx 게시글 번호
	* @param Object req - request 객체 
	*/
	updateViewCount : async function (idx, req) {
		/** boardview에 UV(Unique view) 추가 */
		try {
			if (!idx || !req) 
				return;
			
			const browserId = getBrowserId(req);
			const sql = 'INSERT INTO boardview VALUES (?, ?)';
			await sequelize.query(sql, {
				replacements : [browserId, idx],
				type : QueryTypes.INSERT,
			});
		} catch (err) {}
		
		/** UV 데이터를 계산해서 조회수 업데이트 */
		try {
			let sql = "SELECT COUNT(*) as cnt FROM boardview WHERE idx = ?";
			const rows = await sequelize.query(sql, {
				replacements : [idx],
				type : QueryTypes.SELECT,
			});
			
			sql = `UPDATE boarddata 
								SET 
									viewCount = :viewCount
							WHERE 
								idx = :idx
					`;
			const replacements = {
				viewCount : rows[0].cnt,
				idx,
			};
			
			await sequelize.query(sql, {
				replacements,
				type : QueryTypes.UPDATE,
			});
		} catch (err) {}
	},
};

module.exports = board;