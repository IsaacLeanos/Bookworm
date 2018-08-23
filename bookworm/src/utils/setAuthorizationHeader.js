import axios from 'axios'

export default(token=null)=>{
    if(token){
        axios.defaults.headers.common.authorization=`Bearer ${token}`
        console.log('HRE HERE HERE HRE')
    }else{
        delete axios.defaults.headers.common.authorization
    }
}