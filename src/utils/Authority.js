export function isAllowMenu(store) {
    const users = JSON.parse(sessionStorage.getItem('user'));
    let idx;
    users.menu.map((col) => {
        store.map((menu,index)=>{
            if(col.resourceCode === menu.code){
                menu.isShow = true;
            }else{
                if(menu.isSelect){
                    idx = index
                }
            }
            if(menu.haveSon){
                for (let i in menu.sonMenu){
                    if(col.resourceCode === menu.sonMenu[i].code){
                        menu.sonMenu[i].isShow = true;
                    }else{
                        idx = i;
                    }
                }
            }
        })
    })
    store.map((item)=>{
        if(item.haveSon){
            if(idx == 'remove'){
                idx = 0;
            }
            if(item.sonMenu[idx].isSelect&&!item.sonMenu[idx].isShow){
                let j = parseInt(idx) + 1;
                item.sonMenu[j].isSelect = true;
            }
        }
        if(store[idx]!== undefined){
            if(store[idx].isSelect&&!store[idx].isShow){
                let n = parseInt(idx) + 1;
                store[n].isSelect = true;
            }
        }
    })
}