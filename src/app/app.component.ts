import { animation } from "@angular/animations";
import { Component, OnInit, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  ngAfterViewInit(): void {
    // init animation
    // [1, 2, 3].forEach(id => this.animate(id.toString(), 3000 * id));
    this.animate();
  }

  private draw({
    timePassed,
    boxId,
    moveThrottle = 20,
    diagonalSlope = 7,
    moveUnits = "px"
  }) {
    const el = document.getElementById(boxId);
    el.style.left = timePassed / moveThrottle + moveUnits;
    el.style.top = timePassed / moveThrottle / diagonalSlope + moveUnits;
  }

  private animate(delay = 20) {
    //boxId: string, animationLimit = 6000,
    let start = Date.now();
    const idToDelay = [1, 2, 3].map(boxId => ({
      boxId,
      animationLimit: 3000 * boxId
    }));
    const intervalCallback = timer => {
      const timePassed = Date.now() - start;

      idToDelay.forEach(({ boxId, animationLimit }) => {
        if (timePassed >= animationLimit) {
          clearInterval(timer);
          return;
        }

        this.draw({ timePassed, boxId });
      });
    };
    var timer = setInterval(intervalCallback, delay);
  }

  name = "Angular " + VERSION.major;
}
