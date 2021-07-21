var showPage = function(page){
    return db.communities.find().skip((page-1)*2).limit(5);
}
