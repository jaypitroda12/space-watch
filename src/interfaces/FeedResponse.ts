export interface FeedResponse {
  links: FeedLinks
  element_count: number
  near_earth_objects: { [key: string]: NearEarthObject[] }
}

export interface ErrorResponse {
  code: number
  http_error: string
  error_message: string
  request: string
}

interface FeedLinks {
  next: string
  prev: string
  self: string
}

interface NearEarthObject {
  links: { [key: string]: string }
  id: string
  neo_reference_id: string
  name: string
  nasa_jpl_url: string
  absolute_magnitude_h: number
  estimated_diameter: EstimatedDiameter
  is_potentially_hazardous_asteroid: boolean
  close_approach_data: CloseApproachDatum[]
  is_sentry_object: boolean
}

interface CloseApproachDatum {
  close_approach_date: Date
  close_approach_date_full: string
  epoch_date_close_approach: number
  relative_velocity: RelativeVelocity
  miss_distance: MissDistance
  orbiting_body: string
}

interface MissDistance {
  astronomical: string
  lunar: string
  kilometers: string
  miles: string
}

interface RelativeVelocity {
  kilometers_per_second: string
  kilometers_per_hour: string
  miles_per_hour: string
}

interface EstimatedDiameter {
  kilometers: DiameterMinMax
  meters: DiameterMinMax
  miles: DiameterMinMax
  feet: DiameterMinMax
}

interface DiameterMinMax {
  estimated_diameter_min: number
  estimated_diameter_max: number
}
