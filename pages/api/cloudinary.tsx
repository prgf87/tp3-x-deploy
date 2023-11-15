import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
})

export const uploadImage = async (img: string, id: string) => {
  console.log('IMAGE####', img)
  console.log('ID####', id)
  const res = await cloudinary.v2.uploader.upload(
    img,
    { id },
    function (error, result) {
      console.log('QUERY RESULT#####: ', result)
      if (error) {
        console.log('ERROR#####: ', error)
        return error
      } else {
        return result
      }
    }
  )
  console.log('RESPONSE########: ', res)
  return res
}
