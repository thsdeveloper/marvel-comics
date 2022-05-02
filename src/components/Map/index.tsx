import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  // useMapEvents,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as S from './styles'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
// import { useState } from 'react'

export default function LeafletMap({ data }) {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetinaUrl.src,
    iconUrl: iconUrl.src,
    shadowUrl: shadowUrl.src,
  })

  // function LocationMarker() {
  //   const [position, setPosition] = useState(null)
  //
  //   const map = useMapEvents({
  //     click() {
  //       map.locate()
  //     },
  //     locationfound(e) {
  //       setPosition(e.latlng)
  //       map.flyTo(e.latlng, map.getZoom())
  //     },
  //   })
  //
  //   return position === null ? null : (
  //     <Marker position={position} draggable={true}>
  //       <Popup>Sua localização</Popup>
  //     </Marker>
  //   )
  // }

  return (
    <S.MapWrapper>
      <MapContainer
        center={[data.geolocation.latitude, data.geolocation.longitude]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/*<LocationMarker />*/}
        <Marker
          draggable={false}
          position={[data.geolocation.latitude, data.geolocation.longitude]}
        >
          {data.latitude}
          <Popup>{data.address}</Popup>
        </Marker>
      </MapContainer>
    </S.MapWrapper>
  )
}
