export const state = ()=>({
    name : '123'
})

export const mutations = {
    actState(state,data){
        state.name = data
    }
}