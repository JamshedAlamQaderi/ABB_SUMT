const database = require('../database/db')

class AdminRepository{

    insert({username, password, role}, onError, onSuccess){
        if(database === 'undefined') return onError("AdminRepository::insert-> Database not Found!");
        let query = `insert into admin(username, password, role) values (?,?,?)`
        database.query(query, [username, password, role], (err, res, field)=>{
            if(err) return onError("AdminRepository::insert-> new admin creation error, " + err.message)
            onSuccess(`New admin created by username (${username}) successfully`)
        })
    }

    readAll(onError, onSuccess){
        if(database === 'undefined') return onError("AdminRepository::readAll-> Database not Found!");
        let query = `select * from admin`;
        database.query(query, (err, res, field)=>{
            if(err) return onError("AdminRepository::readAll-> reading all admin data error, " + err.message)
            onSuccess(res)
        })
    }

    login({username, password}, onError, onSuccess){
        if(database === 'undefined') return onError("AdminRepository::login-> Database not Found!");
        let query = `select * from admin where username=? and password=?`;
        database.query(query, [username, password], (err, res, field)=>{
            if(err) return onError("AdminRepository::login-> login by (username:"+username+", password: "+password+") failed, error: " + err.message)
            onSuccess(res)
        })
    }

    readById(id, onError, onSuccess){
        if(database === 'undefined') return onError("AdminRepository::readByUsername-> Database not Found!");
        let query = `select * from admin where id=?`;
        database.query(query, [id], (err, res, field)=>{
            if(err) return onError("AdminRepository::readById-> reading by id("+id+") error, " + err.message)
            onSuccess(res)
        })
    }

    updatePassword(id, new_password, onError, onSuccess){
        if(database === 'undefined') return onError("AdminRepository::updatePassword-> Database not Found!");
        let query = `update admin set password = ? where id = ?`;
        database.query(query, [new_password, id], (err, res, f)=>{
            if(err) return onError("AdminRepository::updatePassword-> update password by id="+id+" error, " + err.message)
            onSuccess("password updated successfully");
        })
    }

    delete(id, onError, onSuccess){
        if(database === 'undefined') return onError("AdminRepository::delete-> Database not Found!");
        let query = `delete from admin where id = ?`;
        database.query(query, [id], (err, res, f)=>{
            if(err) return onError("AdminRepository::delete-> delete admin by id="+id+" error, " + err.message)
            onSuccess("admin deleted successfully")
        })
    }
}

module.exports = new AdminRepository()