const File = require('../../models/file')

const storeFiles = async (productId, files) => {
  try {
    const filesPromise = files.map(
      async ({ originalname, filename }) => {
        File.schema = {
          name: originalname,
          path: `public/images/${filename}`,
          product_id: productId
        }

        await File.create(File.schema)
      }
    )

    await Promise.all(filesPromise)
  } catch (error) {
    throw Error(error)
  }
}

module.exports = storeFiles
