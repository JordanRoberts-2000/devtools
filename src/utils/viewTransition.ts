const viewTransition = (transitionFn: () => void, onFinishedCb?: () => void) => {
    if(!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches){
        transitionFn();
        console.log("no support")
        if(onFinishedCb)onFinishedCb();
    }else{
        console.log('support')
        const transition = document.startViewTransition(() => {
            transitionFn();
            if(onFinishedCb)transition.finished.finally(onFinishedCb);
        })
    }
}

export default viewTransition