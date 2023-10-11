import './Form.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import { useForm } from 'react-hook-form';

function Form() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async formData => {
    const url = 'https://dev.api.cmaxcrm.com/api/integration'; // address of your api
    const token = '8mCmTfu96fV20TIburF2'; // affiliate api token

    //So full url with token should be like this
    // https://dev.api.cmaxcrm.com/api/integration?api_token=8mCmTfu96fV20TIburF2

    const fullUrl = `${url}?api_token=${token}`;

    try {
      // get user ip (you can use any other method to get user ip)
      const user_ip = await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip);

      const reqData = {
        affiliate_id: 15, // your affiliate id (number)
        flow_id: 3, // flow id (number)
        user_ip: user_ip, //got it from above (string)
        campaign: 'campaign', // campaign name
        sub_campaign: 'sub_campaign', // sub campaign name

        // data from the form fields below
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
      };
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData),
      }); // send request to you api

      console.log('response', response);

      const {
        data: { autologin },
      } = await response.json(); // get autologin link from response

      window.location.href = autologin; // open autologin link
    } catch (error) {
      alert(error.message); //error handling and customization of their output
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2 className="title">Form</h2>
        <FormControl>
          <TextField {...register('first_name')} label="first_name" />
        </FormControl>
        <FormControl>
          <TextField {...register('last_name')} label="last_name" />
        </FormControl>
        <FormControl>
          <TextField {...register('email')} label="email" />
        </FormControl>
        <FormControl>
          <TextField {...register('phone')} label="phone" />
        </FormControl>
        <Button type="submit" className="btn">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Form;
