import { mapGetters } from 'vuex'

export const playlistMixin = {
    methods:{
        handlePlaylist(){
            throw new Error("No bottom distance set");
        }
    },
    computed: {
        ...mapGetters(['playlist'])
    },
    mounted() {
        this.handlePlaylist(this.playlist);
    },
    activated() {
        this.handlePlaylist(this.playlist);
    },
    watch: {
        playlist(newList){
            this.handlePlaylist(newList);
        }
    },
}