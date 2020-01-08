export const state = () => ({
    hisData:[],
    money:0
})

export const mutations = {
    increment(state,data){
        state.hisData.unshift(data);
    },
    dataMoney(state,data){
        state.money = data
    }
}