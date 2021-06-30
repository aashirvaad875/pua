import buildClient from '../api/build-client';

const LandingPage = ({data})=>{

    return  data ? <h1>You are signed in</h1> : <h1>You are not signed</h1>
}

LandingPage.getInitialProps = async(context)=>{
    console.log('Langing Page')
    const client = buildClient(context);
    const {data} = await client.get('/api/users/currentuser');
    return data;   
}

export default LandingPage;