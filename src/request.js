import axios from 'axios'
import dotenv from 'dotenv';


let baseUrl = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=srrlism&api_key=b26782b28af4cf40286635235405d80c&format=json`
//const baseUrl = `http://ws.audioscrobbler.com/2.0/`
const parsing = (res) => {
    const topAlbumData=[];
    const topAlbums = res.data.topalbums.album;
    for (let {name, image, playcount} of topAlbums){
        let albumImage = '';
        for (let typeOfImg of image){
            if (typeOfImg.size === 'large'){
                albumImage = typeOfImg['#text'];
            }
        }
        topAlbumData.push ({img: albumImage, name, playcount});
    }
    return topAlbumData;
}
export default async (userName) => {
    dotenv.config();
    const APIKEY = process.env.VUE_APP_APIKEY;
    baseUrl = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${userName}&api_key=${APIKEY}&format=json`
    return axios.get(baseUrl, {params: {period: '12month' }}).then (parsing);
}
