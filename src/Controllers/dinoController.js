const dinoController = ( Dino ) => {
    const post = (req, res) => {
        const dino = new Dino(req.body)
        dino.save()
        res.status(201).send(dino)  // 201 means created
    }
    const get = (req, res) => {
    
        const query = req.query
        Dino.find(query, (err, dinos) => {
            err ? res.status(500).send(err) : res.json(dinos)
        });
    }
    return {
        post: post,
        get: get
    }
}


module.exports = dinoController;