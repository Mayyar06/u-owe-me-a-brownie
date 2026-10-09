import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdditiveBlending, Object3D, type InstancedMesh, type ShaderMaterial } from "three";

export interface GodRaysProps {
  opacity?: number;
}

export interface BubblesProps {
  count?: number;
  speed?: number;
}

export interface CoralProps {
  count?: number;
}

export interface FoodPelletsProps {
  count?: number;
  speed?: number;
}

const hash = (seed: number) => {
  const value = Math.sin(seed * 127.1 + 78.233) * 43758.5453;
  return value - Math.floor(value);
};

export function GodRays({ opacity = 0.14 }: GodRaysProps) {
  const material = useRef<ShaderMaterial>(null);
  const { width, height } = useThree((state) => state.viewport);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uOpacity: { value: opacity } }), [opacity]);

  useFrame(({ clock }) => {
    if (material.current) material.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh position={[0, 0, -2]} scale={[width, height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform float uOpacity;
          varying vec2 vUv;
          float ray(float origin, float drift, float spread) {
            float center = origin + (1.0 - vUv.y) * drift;
            float distanceToRay = abs(vUv.x - center);
            return (1.0 - smoothstep(0.0, spread, distanceToRay)) * pow(vUv.y, 1.2);
          }
          void main() {
            float beams = ray(0.28, 0.12, 0.16) + ray(0.54, -0.10, 0.12) + ray(0.78, -0.15, 0.18);
            float shimmer = 0.88 + 0.12 * sin(uTime * 0.7 + vUv.y * 9.0);
            gl_FragColor = vec4(0.28, 0.63, 0.82, beams * shimmer * uOpacity);
          }
        `}
      />
    </mesh>
  );
}

export function Bubbles({ count = 34, speed = 0.45 }: BubblesProps) {
  const mesh = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const { width, height } = useThree((state) => state.viewport);
  const bubbles = useMemo(() => Array.from({ length: count }, (_, index) => ({
    x: (hash(index + 1) - 0.5) * width,
    offset: hash(index + 101) * height,
    z: hash(index + 201) * 1.4,
    radius: 0.025 + hash(index + 301) * 0.05,
    pace: 0.6 + hash(index + 401) * 0.9,
  })), [count, width, height]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const time = clock.elapsedTime;
    bubbles.forEach((bubble, index) => {
      const y = ((bubble.offset + time * speed * bubble.pace) % (height + 1)) - height / 2 - 0.5;
      dummy.position.set(bubble.x + Math.sin(time * 0.7 + index) * 0.08, y, bubble.z);
      dummy.scale.setScalar(bubble.radius);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null!, null!, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#b8e4f0" metalness={0.15} roughness={0.12} transparent opacity={0.35} depthWrite={false} />
    </instancedMesh>
  );
}

export function Coral({ count = 28 }: CoralProps) {
  const stems = useRef<InstancedMesh>(null);
  const tips = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const { width, height } = useThree((state) => state.viewport);

  useEffect(() => {
    if (!stems.current || !tips.current) return;
    for (let index = 0; index < count; index++) {
      const x = (hash(index + 501) - 0.5) * width;
      const stemHeight = 0.25 + hash(index + 601) * 0.8;
      const baseY = -height / 2 + 0.05;
      const z = 0.15 + hash(index + 701) * 0.5;
      dummy.position.set(x, baseY + stemHeight / 2, z);
      dummy.rotation.set(0, 0, (hash(index + 801) - 0.5) * 0.35);
      dummy.scale.set(0.7, stemHeight, 0.7);
      dummy.updateMatrix();
      stems.current.setMatrixAt(index, dummy.matrix);

      dummy.position.set(x, baseY + stemHeight, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(0.07 + hash(index + 901) * 0.055);
      dummy.updateMatrix();
      tips.current.setMatrixAt(index, dummy.matrix);
    }
    stems.current.instanceMatrix.needsUpdate = true;
    tips.current.instanceMatrix.needsUpdate = true;
  }, [count, dummy, width, height]);

  return (
    <>
      <instancedMesh ref={stems} args={[null!, null!, count]} frustumCulled={false}>
        <cylinderGeometry args={[0.025, 0.05, 1, 5]} />
        <meshStandardMaterial color="#a25f80" roughness={0.9} transparent opacity={0.72} depthWrite={false} />
      </instancedMesh>
      <instancedMesh ref={tips} args={[null!, null!, count]} frustumCulled={false}>
        <sphereGeometry args={[1, 7, 5]} />
        <meshStandardMaterial color="#f0c6cb" roughness={0.75} emissive="#84465b" emissiveIntensity={0.22} transparent opacity={0.82} depthWrite={false} />
      </instancedMesh>
    </>
  );
}

export function FoodPellets({ count = 10, speed = 0.28 }: FoodPelletsProps) {
  const mesh = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const { width, height } = useThree((state) => state.viewport);
  const pellets = useMemo(() => Array.from({ length: count }, (_, index) => ({
    x: (hash(index + 1001) - 0.5) * width * 0.75,
    offset: hash(index + 1101) * height,
    radius: 0.025 + hash(index + 1201) * 0.02,
    pace: 0.7 + hash(index + 1301) * 0.6,
  })), [count, width, height]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const time = clock.elapsedTime;
    pellets.forEach((pellet, index) => {
      const y = height / 2 + 0.3 - ((pellet.offset + time * speed * pellet.pace) % (height + 0.6));
      dummy.position.set(pellet.x + Math.sin(time + index * 2) * 0.04, y, 0.9);
      dummy.scale.setScalar(pellet.radius);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null!, null!, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 5]} />
      <meshStandardMaterial color="#e9c6aa" roughness={0.85} emissive="#7e4d40" emissiveIntensity={0.12} />
    </instancedMesh>
  );
}

export default function AquariumEffects() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const probe = document.createElement("canvas");
    const webglAvailable = Boolean(probe.getContext("webgl2") || probe.getContext("webgl"));
    const update = () => setEnabled(webglAvailable && !reducedMotion.matches);
    update();
    reducedMotion.addEventListener("change", update);
    return () => reducedMotion.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <div className="aquarium-effects" aria-hidden="true">
      <Canvas orthographic camera={{ position: [0, 0, 10], zoom: 60 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}>
        <ambientLight color="#a4cadd" intensity={0.8} />
        <directionalLight color="#d0e6f1" intensity={1.1} position={[-3, 5, 5]} />
        <GodRays />
        <Coral />
        <Bubbles />
        <FoodPellets />
      </Canvas>
    </div>
  );
}
