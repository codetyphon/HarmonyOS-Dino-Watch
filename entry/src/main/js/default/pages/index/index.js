export default {
    data: {
        dino: {
            w:90,
            h:96,
            x:80,
            y:300,
            toY:300,
            frame:'dino',
            run:true
        },
        cactus:{x:454,y:300,w:50,h:100},
        bg:[
            {x:0},
            {x:2393}
        ],
        jump:150,
        speed:{
            x:0,
            y:0
        },
        time:0,
        score:0,
        game_over:false,
        time_id:null
    },
    bgMove(){
        const {bg,speed}=this

        if(bg[0].x<2393){
            bg[0].x-=speed.x
        }
        if(bg[1].x<2393){
            bg[1].x-=speed.x
        }

        if(bg[1].x<=-2393+454 && bg[0].x==2393){
            bg[0].x=454
        }
        if(bg[0].x<=-2393+454 && bg[1].x==2393){
            bg[1].x=454
        }

        if(bg[1].x<=-2393){
            bg[1].x=2393
        }
        if(bg[0].x<=-2393){
            bg[0].x=2393
        }
    },
    cactus_update(){
        const {cactus,speed}=this
        cactus.x-=speed.x
        if(cactus.x<=-50){
            cactus.x=454
        }
    },
    score_update(){
        this.score+=0.05
    },
    collision_check(){
        const {dino,cactus}=this
        if(dino.x + dino.w > cactus.x && dino.x < cactus.x + cactus.w){
            if(cactus.y + cactus.h > dino.y && cactus.y < dino.y + dino.h){
                this.game_over=true
            }
        }
    },
    gameover(){
        this.game_over=true
    },
    dino_update(){
        const {time,jump,speed,dino}=this
        if(dino.run){
            if(time%2==0){
                dino.frame='a'
            }
            if(time%4==0){
                dino.frame='b'
            }
        }else{
            dino.frame='dino'
        }
        const {y,toY}=dino
        if(toY<=y){
            dino.y-=speed.y
            dino.run=false
        }
        if(y<=jump){
            dino.toY=300
        }
        if(toY>=y){
            dino.y+=speed.y
            dino.run=true
        }
    },
    loop(){
        if(this.game_over){
            return
        }
        this.time+=1
        this.score+=0.0001
        this.bgMove()
        this.cactus_update()
        this.dino_update()
        this.score_update()
        this.collision_check()
    },
    reset(){
        const {dino}=this
        dino.y=300
        dino.toY=300
        this.time=0
        this.score=0
        this.bg[0].x=0
        this.bg[1].x=2393
        this.cactus.x=454
        this.game_over=false
        this.time_id={}
        this.jump=100
        this.speed={
            x:10,y:10
        }
    },
    start(){
        console.log('start')
        const loop = this.loop
        setInterval(()=>{
            loop()
        },50)
    },
    restart(){
        this.reset()
    },
    click(){
        if(this.game_over){
            this.restart()
        }else{
            const {y,toY}=this.dino
            if(y==toY && y>=300){
                this.dino.toY=this.jump
            }
        }
    },
    onReady(){
        this.reset()
        this.start()
    }
}
