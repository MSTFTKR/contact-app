const axios = require('axios')



const randomUser1 = async () => {
    try {
            const resp = await axios.request({
                method: 'get',
                url: 'https://randomuser.me/api/',
                headers: {}
            })
            const kisi = {
                ad: resp.data.results[0].name.first,
                soyad: resp.data.results[0].name.last, 
                cinsiyet: resp.data.results[0].gender, 
                sehir: resp.data.results[0].location.city, 
                telno: resp.data.results[0].phone
            }
        return kisi
    }

    catch (error) {
        throw new Error('1.apiden çekilemiyor')
    }

}

const randomUser2 = async () => {
    try {
            const resp = await axios.request({
                method: 'get',
                url: 'https://random-data-api.com/api/v2/users',
                headers: {}
            })
            const kisi = {
                ad: resp.data.first_name,
                soyad: resp.data.last_name, 
                cinsiyet: resp.data.gender, 
                sehir: resp.data.address.city, 
                telno: resp.data.phone_number
            }
                return kisi
           
            
    }

    catch (error) {

        throw new Error('2.apiden çekilemiyor')

    }

}

const ikili=async ()=>{
    const a=await new Promise((resolve)=>{
        resolve(randomUser1())

    })
    const b=await new Promise((resolve)=>{
        resolve(randomUser2())

    })
   const c=await Promise.all([a,b]).then((sonucs)=>{
        return sonucs
        
    })
    return c
}

const races=async()=>{
    const a=await Promise.race([randomUser1(),randomUser2()]).then((tut)=>{
        return tut;
    })
    return a
}

module.exports = {randomUser1,randomUser2,ikili,races}