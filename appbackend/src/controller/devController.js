const axios = require('axios');
const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/parseStringAsArray');

//index (mostrar varios, um select *), show (mostrar um especifico), store (inserir), update (atualizar), destroy (deletar)

module.exports = { 
    async store (request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev =  await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login, avatar_url, bio } = apiResponse.data;
                
            const techsArray = ParseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray, 
                location,
            });
        }
    
        return response.json(dev);
    },

    async index (request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async update() {
        //so pode atualizar nome, avatar, bio, techs e localização.
    },

    async destroy() {

    },
 };