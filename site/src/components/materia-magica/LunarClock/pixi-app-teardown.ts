import type { Application } from "pixi.js";

/**
 * Destroys one Pixi application without releasing process-wide renderer pools.
 *
 * Pixi treats the boolean renderer option `true` as both `removeView` and
 * `releaseGlobalResources`. Releasing those pools while another Application is
 * rendering can invalidate its live batches, causing crashes when multiple
 * Pixi Applications are running.
 */
export function teardownPixiApp(app: Application): void {
  app.destroy({ removeView: true }, { children: true, texture: false });
}
