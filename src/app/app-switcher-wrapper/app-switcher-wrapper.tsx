import {AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, SimpleChanges, ViewChild} from '@angular/core';
import * as React from 'react';
import {useEffect} from 'react';
import * as ReactDOM from 'react-dom';
import {DotAppSwitcher, DotCoreApiProvider, DotThemeProvider, useDotCoreApiContext} from '@digital-ai/dot-components';

const containerElementName = 'dotAppSwitcherContainer';

@Component({
    selector: 'app-switcher',
    template: `<span #${containerElementName}></span>`
})
export class CustomReactComponentWrapperComponent implements OnChanges, OnDestroy, AfterViewInit {
    @ViewChild(containerElementName, {static: true}) containerRef!: ElementRef;


    ngOnChanges(changes: SimpleChanges): void {
        this.render();
    }

    ngAfterViewInit() {
        this.render();
    }

    ngOnDestroy() {
        ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
    }

    private render() {

        const OpenAppSwitcher = () => {
            const {isAppSwitcherOpen, setIsAppSwitcherOpen, applications} = useDotCoreApiContext();

            useEffect(() => {
                setIsAppSwitcherOpen(true);
            }, []);

            const appSwitcherOnClick = () => {
                setIsAppSwitcherOpen((orig) => !orig);
            };

            return (
                <>
                    <DotAppSwitcher includePlatformConsole={true}
                                    activeApp={{name: 'Agile 1', product: "Agility"}}
                                    open={true}
                                    onClose={appSwitcherOnClick}
                                    apps={applications}
                                    accountId={"c390d325-1628-4c4e-a1ee-d269e025c34e"}/>
                </>
            );
        };

        ReactDOM.render(
            <DotThemeProvider>
                <DotCoreApiProvider apiUrl="https://demo-mock-api">
                    <OpenAppSwitcher/>
                </DotCoreApiProvider>
            </DotThemeProvider>
            ,
            this.containerRef.nativeElement
        );
    }
}
