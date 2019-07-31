import http from '@/core/require';

export default {
    //推荐歌曲
    get_new_song() {
        return http.get('/banner?type=1')
    },
    //热门推荐
    get_h_recommend(params) {
        return http.get('/personalized')
    },
    //新碟上架
    get_n_record() {
        return http.get('/album/newest')
    },
    //榜单
    get_Leaderboard(params) {
        return http.get('/top/list', params)
    },
    //入驻歌手列表
    get_entering_list(params) {
        return http.get('/artist/list', params)
    }
}
