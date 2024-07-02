import { pool } from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'secreto_del_jwt';

export const getUsuarioLogin = async  (req, res) => {
    try {
        
        const rows = await pool.query(
            `CALL getUsuarioLogin(?, ?, ?);`, [req.query.id_empresa, req.query.email, req.query.password]
        )  

        let data = rows[0][0][0]
        //console.log('data:', data)

        const password = req.query.password;

        //let passwordHash = await bcrypt.hash(password, 8);
        //console.log('passwordHash:', passwordHash);
        
        //data.password = ''
        //console.log('status:', data )
        if (data.status === 200) {

            let hashSaved = data.password;
            let compare = await bcrypt.compare(password, hashSaved);
            
            console.log('hashSaved:', hashSaved)
            console.log('password:', password)
            data.password = ''
            if (compare){                
                data.status = 200
                data.message = 'Usuario autenticado'

                //GENERO EL TOKEN
                const user = { 
                    id: data.id_usuario, 
                    username: data.email
                };
                
                jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                    // if (err) {
                    //   res.status(500).json({ error: 'Error al generar el token JWT' });
                    // } else {
                    //   //res.json({ token });
                      
                    //   data.token = token
                    // }
                    console.log('token:', token)
                    data.token = token
                    console.log('data:', data)

                    res.json({
                        success: true,
                        records: data.length,
                        data
                    })                      

                });

            } else {
                data.status = 401
                data.message = 'Contraseña incorrecta'

                res.json({
                    success: false,
                    records: data.length,
                    data
                })          
            }
            //1 Corintios 7:23
        } else {
            data.status = 401

            res.json({
                success: false,
                records: data.length,
                data
            })  
        }
                    
    } catch (error) {
        //console.log('Error: ', error)
        res.status(500).json({
            message: `${error}`
        })
    }
}