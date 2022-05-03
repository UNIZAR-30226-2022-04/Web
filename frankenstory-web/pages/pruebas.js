import Layout from "components/Layout";
import { useEffect, useState } from "react";

export default function Pruebas() {

    const [windowUser, setWindowUser] = useState({}) 

    var radius = 300; // radius of circle in px
    var angle = 90; // span angle of points on circle (angle between first and last point)
    var pointSize = 25; // size of points in px

    // point elements (bullet/buttons)
    var points = [
        { id: 'POINT_ID_1', label: 'Point label 1' },
        { id: 'POINT_ID_2', label: 'Point label 2' },
        { id: 'POINT_ID_3', label: 'Point label 3' },
        { id: 'POINT_ID_4', label: 'Point label 4' },
        { id: 'POINT_ID_5', label: 'Point label 5' },
    ];

    // log notification (demo purpose only)
    function insertNotification(message) {
        var notifier = document.getElementById('notifier');

        var notif = document.createElement('p');
        notif.textContent = message;

        notifier.appendChild(notif);
    }

    useEffect(()=>{
        if(localStorage.getItem("logged") == "si"){
          const username = localStorage.getItem("username")
          const password = localStorage.getItem("password")
          const picture = localStorage.getItem("picture")
          const coins = localStorage.getItem("coins")
          const stars = localStorage.getItem("stars")
    
          setWindowUser({
            username: username, 
            password: password,
            picture: picture,
            coins: coins,
            stars: stars
          })
          console.log("SACO DATOS")
        }else{
          console.log("VOY A LOGIN")
          router.push("/")
        }
    }, [])

    useEffect(() => {
        // once DOM is ready
        window.addEventListener('DOMContentLoaded', function() {
            // DOM element for curve menu
            var navElem = document.getElementById('nav');

            // create curve menu instance
            var instance = new CurvedMenu(navElem, {
                radius: radius,
                angle: angle,
                pointSize: pointSize,
                points: points,
                onInit: function(  ) {
                    insertNotification( 'Curved menu initialized!' );
                    console.log( 'Curved menu initialized!' );
                },
                onClick: function( id ) {
                    insertNotification( 'Clicked point id: ' + id );
                    console.log( 'Selected point id: ', id );
                }
            });

            // initialize curve menu instance at your will
            document.getElementById('button').addEventListener('click', function(){
                if(instance) {
                    // initialize
                    instance.init();

                    // set active point using `id`
                    setTimeout(function() {
                        instance.setActivePoint('POINT_ID_2');
                    }, 2000);

                    // destroy instance
                    setTimeout(function() {
                        // destory
                        instance.destroy();

                        setTimeout(function(){
                            // re-initialize
                            instance.init();
                        }, 3000);
                    }, 6000);
                }
            });
        });
    }, [])
    
    return (
        <Layout data={windowUser}>
            <div id="nav">
                <h3>Curved menu will initialize here.</h3>
                <h4>Check your console for info.</h4>

                <button id="button">Initialize Curved Menu</button>
            </div>
        </Layout>
    )
  }