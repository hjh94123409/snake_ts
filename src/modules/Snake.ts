class Snake{
    //获取蛇头
    head: HTMLElement;
    //蛇的身体（包括蛇头）
    bodies: HTMLCollection;
    element: HTMLElement;

    constructor(){
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');
    }

    //获取蛇的坐标（蛇头坐标）
    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }

    //设置蛇头的坐标
    set X(value: number){
        if(this.X === value){
            return;
        }
        if(value < 0 || value > 290){
            throw new Error('蛇撞墙了')
        }
        //在修改x时，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            //如果发生了掉头，让蛇向反方向继续移动
            if(value > this.X){
                // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇续续向左走
                value = this.X - 10
            } else {
                value = this.X + 10
            }
        }

        this.moveBody()
        this.head.style.left = value + 'px';
        //检查有没有撞到自己
        this.checkHeadBody()
    }
    set Y(value: number){
        if(this.Y === value){
            return;
        }
        if(value < 0 || value > 290){
            throw new Error('蛇撞墙了')
        }
        //在修改y时，蛇在垂直移动，蛇在下移动时，不能向上掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            //如果发生了掉头，让蛇向反方向继续移动
            if(value > this.Y){
                value = this.Y - 10
            } else {
                value = this.Y + 10
            }
        }
        this.moveBody()
        this.head.style.top = value + 'px';
        //检查有没有撞到自己
        this.checkHeadBody()

    }

    //蛇增加身体的方法
    addBody(){
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }

    //添加一个蛇身体移动的方法
    moveBody(){
        /* 
            将后边的身体设置为前边身体的位置
                举例子：
                    第4节 = 第3节位置
                    。。。
        */
        for(let i = this.bodies.length - 1; i > 0; i--){
            //获取前边身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            //将值设置到当前身体
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    //
    checkHeadBody(){
        //获取所有身体，检查其是否和蛇头发生重叠
        for(let i = 1; i < this.bodies.length; i++){
            let bd = this.bodies[i] as HTMLElement
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                //进入判断，说明蛇头撞到身体
                throw new Error('撞到自己了！')
            }
        }
    }

}

export default Snake