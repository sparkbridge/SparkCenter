const { read, write } = require("./fs");

class CFGHelper{
    Adapter;
    servers;
    path;
    constructor(path){
        try{
            const cfg =JSON.parse(read(path));
            this.Adapter = cfg.Adapter;
            this.servers = cfg.servers;
            this.path = path;
        }catch(eerrr){
            console.log('初始化配置文件出错！！');
            console.log(eerrr);
        }
    }
    getClientType(){
        return this.Adapter.type;
    }
    getClientInfo(){
        return this.Adapter;
    }
    getServer(name){
        return this.servers[name];
    }
    getGroup(gid){
        return this.Adapter.group[gid];
    }
    addServer(name,url,pwd){
        if(this.servers[name] == undefined){
            this.servers[name] = {
                url,
                pwd
            }
        }else{
            return false;
        }
    }
    save(){
        write(path,JSON.stringify({Adapter:this.Adapter,servers:this.servers},null,4));
    }
}

module.exports = CFGHelper;