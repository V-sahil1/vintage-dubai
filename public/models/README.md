# 3D vehicle models

Drop the Range Rover Sport Autobiography model here as:

    range-rover-sport-autobiography.glb

It is referenced from `lib/vehicles.ts` (`viewer3d.model`). Until the file exists, the
3D viewer shows a procedural stand-in. The viewer automatically:

- scales the model to the real 4,946 mm length and centres it on the turntable
- repaints materials named like `paint` / `body` / `carpaint` in Santorini Black
- tints `glass` / `window` materials, lights `headlight` / `taillight` materials,
  and makes `tire` / `tyre` materials matte (see `classify` in
  `components/viewer3d/CarModels.tsx` to match your model's material names)
- hides baked `shadow` / `ground` planes

Draco- and Meshopt-compressed .glb files are supported.
