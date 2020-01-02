export const state = ()=>({
    name : {
        token: '',
        user: {}
    }
})

export const mutations = {
    actState(state,data){
        state.name = data
    }
}


export const actions = {
    hronouswrite(context,data){
        return this.$axios({
            url:'/accounts/login',
            method: 'post',
            data
        }).then(res=>{
            console.log(res);
            context.commit('actState',res.data)
            return true
        })
    }
}