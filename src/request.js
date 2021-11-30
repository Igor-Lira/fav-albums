import axios from 'axios'
import dotenv from 'dotenv';

const parsing = (res) => {
    let count = 0;
    const topAlbumData=[];
    const topAlbums = res.data.topalbums.album;
    for (let {name, image, playcount} of topAlbums){
        const albumImage = image.find(img => img.size === 'large')['#text'];
        if (albumImage && count < 51){
            topAlbumData.push ({img: albumImage, name, playcount});
            count++;
        }
    }
    return topAlbumData;
}
export default async (userName) => {
    dotenv.config();
    const APIKEY = process.env.VUE_APP_APIKEY;
    const baseUrl = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${userName}&api_key=${APIKEY}&format=json`
    return axios.get(baseUrl, {params: {period: '12month', limit: 60 }}).then (parsing);
}
