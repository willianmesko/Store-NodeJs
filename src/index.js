const app = require('./app/app');

const listenServer = async () => {
  try {
    const PORT = 3000
    const HOST = 'localhost'
    
    await app.listen(PORT, HOST)

    console.log(`Server listening on ${PORT}`)
  } catch(err) {   
    throw new Error(err)
  }
}

listenServer()
