
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

class GameControl{

    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    //创建一个属性存储蛇的移动方向
    direction: string = '';

    isLive = true;

    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        // this.init()
    }

    //游戏初始化，调用后游戏即开始
    init(){
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        // 调用run 方法，使蛇移动
        this.run();
    }

    //创建键盘按下的响应函数
    keydownHandler(event: KeyboardEvent){
        // console.log(event.key)
        //修改direction
        this.direction = event.key
    }

    //创建控制蛇移动的方法
    run(){

        /* 
            根据方向来使蛇的位置改变
                向上 top 减少
                向下 top 增加
                向左 left 减少
                向右 left 增加
        */
        //获取蛇现在的坐标
        let X = this.snake.X
        let Y = this.snake.Y

        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                X += 10;
                break;
        }

        //检查蛇是否吃到食物
        this.checkEat(X, Y);
        
        
        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (e) {
            //出现异常，游戏结束
            if(e instanceof Error){
                alert(e.message + 'GAME OVER')
            }
            this.isLive = false;
        }

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)

    }

    // 检查蛇是否吃到食物
    checkEat(X: number, Y: number){
        if(X === this.food.X && Y === this.food.Y){
            //食物的位置重置
            this.food.change();
            //分数增加
            this.scorePanel.addScore();
            //蛇增加一节
            this.snake.addBody();
        } 
    }

}

export default GameControl