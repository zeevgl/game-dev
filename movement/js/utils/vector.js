class Vector {
    constructor(arr) {
        this.arr = arr;
    }

    add(otherVector) {
        const oa = otherVector.arr;
        if (this.arr.length === oa.length) {
            let res = []
            for (let key in this.arr) {
                res[key] = this.arr[key] + oa[key]
            }
            return new Vector(res)
        }
    }

    get vx() {
        return this.arr[0];
    }

    get vy() {
        return this.arr[1];
    }

    set vx(vx) {
        this.arr[0] = vx;
    }

    set vy(vy) {
        this.arr[1] = vy;
    }
}