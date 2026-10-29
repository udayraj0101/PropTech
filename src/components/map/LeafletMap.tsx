"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { developerLogo, type AdaptedDevelopment } from "../../lib/reelly";
import MarkerPopupCard from "./MarkerPopupCard";

const DUBAI_CENTER: [number, number] = [25.2048, 55.2708];

function initials(name: string) {
  const parts = name.split(/[\s-]+/).filter(Boolean);
  if (parts.length === 0) return "—";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function buildIcon(project: AdaptedDevelopment, active: boolean) {
  const logo = developerLogo(project.developer);
  const inner = logo
    ? `<img src="${logo}" alt="${project.developer}" />`
    : `<span>${initials(project.developer)}</span>`;
  return L.divIcon({
    className: `proptech-marker${active ? " proptech-marker--active" : ""}`,
    html: `<div class="proptech-marker-inner">${inner}</div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

/** Fit to bounds once on initial load; fly to active-from-outside only. */
function Viewport({
  projects,
  activeId,
  openId,
}: {
  projects: AdaptedDevelopment[];
  activeId: string | null;
  openId: string | null;
}) {
  const map = useMap();

  // Initial fit to all markers.
  useEffect(() => {
    const points = projects
      .filter((p) => p.lat !== undefined && p.lng !== undefined)
      .map((p) => L.latLng(p.lat as number, p.lng as number));
    if (points.length === 0) return;
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds.pad(0.12), { animate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects.length]);

  // Fly when the user picks a different card on the left (not when
  // just hovering around on the map itself).
  useEffect(() => {
    const target = projects.find((p) => p.id === (openId || activeId));
    if (!target || target.lat === undefined || target.lng === undefined) return;
    map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 13), {
      duration: 0.6,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId, activeId]);

  return null;
}

/** Dismiss the popup when clicking empty map area. */
function CloseOnBackgroundClick({ onClose }: { onClose: () => void }) {
  useMapEvents({
    click: () => onClose(),
  });
  return null;
}

export default function LeafletMap({
  projects,
  activeId,
  openId,
  onHover,
  onOpen,
  onClose,
  detailBase = "/admin/developments",
}: {
  projects: AdaptedDevelopment[];
  /** Hover-highlight state (synced with card hover). */
  activeId: string | null;
  /** Which marker's popup card is open (clicked). */
  openId: string | null;
  onHover: (id: string | null) => void;
  onOpen: (id: string) => void;
  onClose: () => void;
  /** Route prefix for the "View project" link in each marker popup. */
  detailBase?: string;
}) {
  const placed = useMemo(
    () => projects.filter((p) => p.lat !== undefined && p.lng !== undefined),
    [projects]
  );
  const open = projects.find((p) => p.id === openId) ?? null;

  // Programmatically open Leaflet's popup when `openId` changes (so
  // clicking a card on the left opens the matching marker's popup).
  const [markerRefs, setMarkerRefs] = useState<Record<string, L.Marker>>({});
  useEffect(() => {
    if (!open) return;
    const m = markerRefs[open.id];
    if (m) m.openPopup();
  }, [open, markerRefs]);

  return (
    <MapContainer
      center={DUBAI_CENTER}
      zoom={11}
      scrollWheelZoom
      style={{ height: "100%", width: "100%", background: "#DDE7E7" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Viewport projects={placed} activeId={activeId} openId={openId} />
      <CloseOnBackgroundClick onClose={onClose} />

      {placed.map((p) => {
        const isActive = p.id === activeId || p.id === openId;
        return (
          <Marker
            key={p.id}
            position={[p.lat as number, p.lng as number]}
            icon={buildIcon(p, isActive)}
            ref={(ref) => {
              if (ref) {
                setMarkerRefs((prev) =>
                  prev[p.id] === ref ? prev : { ...prev, [p.id]: ref }
                );
              }
            }}
            eventHandlers={{
              click: () => onOpen(p.id),
              mouseover: () => onHover(p.id),
              mouseout: () => onHover(null),
              popupclose: () => {
                if (openId === p.id) onClose();
              },
            }}
          >
            <Popup
              className="proptech-popup"
              closeButton={false}
              maxWidth={280}
              minWidth={280}
              autoPan
              offset={[0, -4]}
            >
              <MarkerPopupCard project={p} onClose={onClose} detailBase={detailBase} />
            </Popup>
          </Marker>
        );
      })}

      {placed.length === 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 500,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              padding: "10px 18px",
              background: "rgba(245,242,234,0.95)",
              border: "1px solid rgba(8,11,15,0.1)",
              fontSize: 12.5,
              color: "rgba(8,11,15,0.6)",
            }}
          >
            No projects to plot — Reelly has not supplied coordinates yet.
          </span>
        </div>
      )}
    </MapContainer>
  );
}
