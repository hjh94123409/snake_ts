class Food{

    element: HTMLElement;
    constructor(){
        this.element = document.getElementById('food')!
    }
    //获取食物X轴坐标的方法
    get X(){
        return this.element.offsetLeft
    }
    //获取食物Y轴坐标的方法
    get Y(){
        return this.element.offsetTop
    }
    //修改食物位置的方法
    change(){
        //生成随机位置
        //食物的位置最小是0 最大是300 - 10 = 290
        // 蛇移动一次就是一格，一格大小就是10，要求坐标是10的倍数
        // Math.floor(Math.random() * 30) * 10
        let left = Math.round(Math.random() * 29) * 10
        let top = Math.round(Math.random() * 29) * 10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

export default Food