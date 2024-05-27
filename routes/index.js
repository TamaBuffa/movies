const express= require ("express");
const fs= require ("fs");
const router= express.Router();


//devuelve el nombre de los archivos dentro de rouytes
const PATH_ROUTES=__dirname;

//remueve la extension

const removeExtension=(fileName)=>{
    return fileName.split('.').shift()
};

//escanea todos los archivos que se encuetren en el directorio
//de las rutas  
fs.readdirSync(PATH_ROUTES).filter((file)=>{
    const name=removeExtension(file)
    if (name!=='index'){
        console.log(`cargando rutas ${name}`)
        //hacemos la carga dinamica de las rutas c su controlador
        router.use(`/${name}`,require (`./${file}`)) //name:nombre del archivo (s/extension)/ file corresponde al nombre de los controladores (c/extension)
    }
});


module.exports=router