class UserRepository{
    constructor(database){
        this.database = database
    }

    insert({name, address, country, steamit_id, referrer, join_date, intro_post_link, impo_post_link, negative_comment, admin_special_comment, moderator_special_comment, user_level, profile}){
        if(this.database === 'undefined') console.log('UserRepository::insert -> database not found!')
        
    }
}

module.exports = UserRepository