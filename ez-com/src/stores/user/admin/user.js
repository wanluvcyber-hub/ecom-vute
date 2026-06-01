import { defineStore } from "pinia";

export const useAdminUserStore = defineStore('admin-user',{
    state: () =>({
        list:[
            {
                name:'Kang',
                role:'admin',
                status:"active",
                updatedAt:(new Date).toISOString()
            }
        ]
    }),
    actions:{
        getUser(index){
            return this.list[index]
        },
        updateUser(index,userData){
            const fileds = ['name','role','status']
            for(let filed of fileds){
                this.list[index][filed] = userData[filed]
            }
            this.list[index].updatedAt = (new Date).toISOString()
        },
        removeUser(index){
            this.list.splice(index,1)
        }
    }
});