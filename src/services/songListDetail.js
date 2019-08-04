import http from '@/core/require';

export default {
    get_song_detail(params) {
        http.get('/playlist/detail', params);
    }
}