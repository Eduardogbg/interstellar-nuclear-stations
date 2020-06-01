import { gql } from "apollo-server";


export default gql`
  extend type Query {
    suitablePlanets(amount: Int!, cursor: Int): ExoplanetCursorResponse
  }

  type ExoplanetCursorResponse {
    count: Int
    cursor: Int
    results: [Exoplanet]
  }

  type Exoplanet {
    name: String
    coordinates: ExoplanetCoordinates
    mass: ExoplanetMeasure
    radius: ExoplanetMeasure
    inclination: ExoplanetMeasure
    semi_major_axis: ExoplanetMeasure
    orbital_period: ExoplanetMeasure
    eccentricity: ExoplanetMeasure
    omega_angle: ExoplanetMeasure
    anomaly_angle: ExoplanetMeasure
    lambda_angle: ExoplanetMeasure
    time_periastron: ExoplanetMeasure
    time_conjonction: ExoplanetMeasure
    angular_distance: ExoplanetMeasure
    tzero_primary_transit: ExoplanetMeasure
    tzero_secondary_transit: ExoplanetMeasure
    impact_parameter: ExoplanetMeasure
    tzero_radial_velocity: ExoplanetMeasure
    velocity_semiamplitude: ExoplanetMeasure
    calculated_temperature: ExoplanetMeasure
    measured_temperature: ExoplanetMeasure
    hottest_point_longitude: ExoplanetMeasure
    geometric_albedo: ExoplanetMeasure
    surface_gravity: ExoplanetMeasure
    detection_method: ExoplanetMeasure
    mass_detection_method: ExoplanetMeasure
    radius_detection_method: ExoplanetMeasure
    parent_star: ExoplanetMeasure
  }
  
  type ExoplanetCoordinates {
    system: String
    right_ascension: Float
    right_ascension_units: String
    declination: Float
    declination_units: String
    epoch: Float
  }

  type ExoplanetMeasure {
    value: Float
    unit: String
    error_max: Float
    error_min: Float
    bibcode: String
  }
`;
