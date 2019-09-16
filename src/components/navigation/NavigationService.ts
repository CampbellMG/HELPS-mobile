import {NavigationActions, NavigationContainerComponent, StackActions} from 'react-navigation';

let navigator: NavigationContainerComponent;

function setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
    navigator = navigatorRef;
}

function navigate(routeName: string, params?: any) {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
}

function replace(routeName: string, params?: any) {
    navigator.dispatch(
        StackActions.replace({
            routeName: routeName,
            params: params
        })
    );
}

function resetTo(route: string) {
    navigator.dispatch(
        StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: route })]
        })
    );
}

export {
    navigate,
    setTopLevelNavigator,
    replace,
    resetTo
};