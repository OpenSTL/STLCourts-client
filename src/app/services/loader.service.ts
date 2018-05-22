import { Injectable } from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {LoadingComponent} from '../loading/loading.component';

@Injectable()
export class LoaderService {
  overlayRef: any = null;
  requests = [];

  constructor(private overlay: Overlay) { }

  start() {
    this.requests.push('req');
    if (this.overlayRef === null) {
      console.log('loader started');
      const positionStrategy = this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically();
      // Returns an OverlayRef (which is a PortalHost)
      this.overlayRef = this.overlay.create({
        hasBackdrop: false,
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy
      });

      // Create ComponentPortal that can be attached to a PortalHost
      const loadingPortal = new ComponentPortal(LoadingComponent);

      // Attach ComponentPortal to PortalHost
      this.overlayRef.attach(loadingPortal);
    }
  }

  complete() {
    this.requests.pop();
    if (this.requests.length === 0) {
      console.log('loader closed');
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

}
