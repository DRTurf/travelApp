"use server"

export default async function handleClick(prompt){
    try{
      const response = await fetch('http://localhost:3000/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
    
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
    
      const data = await response.json();
      return data;
    }
    catch(err){
      console.log("Error" +err);
    }
}