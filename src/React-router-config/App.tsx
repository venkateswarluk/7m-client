import 'bulma/css/bulma.css'
import * as React from 'react'
import {
  renderRoutes,
  RouteConfig,
  RouteConfigComponentProps,
} from 'react-router-config'
import { BrowserRouter, NavLink } from 'react-router-dom'
import { MealTypeList } from '../Meals/MealList'
import { ActivityList } from '../Activities/ActivityList'
import { ActivityDetailsList } from '../ActivityDetails/ActivityDetailsList'
import { ActivityLocationList } from '../ActivityLocations/ActivityLocationList'
import { ActivityOptionList } from '../ActivityOptions/ActivityOptionList'
import { OptionAvailabilityList } from '../OptionAvailabilities/OptionAvailabilityList'
import { ActivityCategoryList } from '../ActivityCategories/ActivityCategoryList'
import { CityBreakList } from '../CityBreaks/CityBreakList'
import { CityBreakDetailsList } from '../CityBreakDetails/CityBreakDetailList'
import { CityBreakInclusionsList } from '../CityBreakInclusions/CityBreakInclusionList'
import { CityBreakExclusionsList } from '../CityBreakExclusions/CityBreakExclusionList'
import { CityBreakLocationsList } from '../CityBreakLocations/CityBreakLocationList'

const Root = ({ route }: RouteConfigComponentProps) => (
  <div>{renderRoutes(route && route.routes)}</div>
)

const routes: ReadonlyArray<RouteConfig> = [
  {
    component: Root,
    routes: [
      {
        path: '/activity',
        exact: true,
        component: ActivityList,
      },
      {
        path: '/activity-details',
        exact: true,
        component: ActivityDetailsList,
      },
      {
        path: '/activity-location',
        exact: true,
        component: ActivityLocationList,
      },
      {
        path: '/activity-option',
        exact: true,
        component: ActivityOptionList,
      },
      {
        path: '/option-availability',
        exact: true,
        component: OptionAvailabilityList,
      },
      {
        path: '/activity-category',
        exact: true,
        component: ActivityCategoryList,
      },
      {
        path: '/meals',
        exact: true,
        component: MealTypeList,
      },
      {
        path: '/city-break',
        exact: true,
        component: CityBreakList,
      },
      {
        path: '/city-break-details',
        exact: true,
        component: CityBreakDetailsList,
      },
      {
        path: '/city-break-inclusions',
        exact: true,
        component: CityBreakInclusionsList,
      },
      {
        path: '/city-break-exclusions',
        exact: true,
        component: CityBreakExclusionsList,
      },
      {
        path: '/city-break-locations',
        exact: true,
        component: CityBreakLocationsList,
      },
    ],
  },
]

export const AppRoutes = () => (
  <BrowserRouter>
    <div className="main-content columns is-fullheight">
      <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
        <div className="has-text-info is-size-5">Activities</div>
        <ul className="menu-list">
          <li>
            <NavLink activeClassName="active" to="/activity">
              Activity
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/activity-details">
              ActivityDetails
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/activity-option">
              ActivityOption
            </NavLink>
          </li>

          <li>
            <NavLink activeClassName="active" to="/option-availability">
              OptionAvailability
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/activity-location">
              ActivityLocation
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/activity-category">
              ActivityCategory
            </NavLink>
          </li>
        </ul>
        <div className="has-text-info is-size-5">Meals</div>
        <ul className="menu-list">
          <li>
            <NavLink exact={true} activeClassName="active" to="/meals">
              Meals
            </NavLink>
          </li>
        </ul>
        <div className="has-text-info is-size-5">CityBreaks</div>
        <ul className="menu-list">
          <li>
            <NavLink exact={true} activeClassName="active" to="/city-break">
              CityBreak
            </NavLink>
          </li>
          <li>
            <NavLink
              exact={true}
              activeClassName="active"
              to="/city-break-details"
            >
              CityBreakDetails
            </NavLink>
          </li>
          <li>
            <NavLink
              exact={true}
              activeClassName="active"
              to="/city-break-inclusions"
            >
              CityBreakInclusions
            </NavLink>
          </li>
          <li>
            <NavLink
              exact={true}
              activeClassName="active"
              to="/city-break-exclusions"
            >
              CityBreakExclusions
            </NavLink>
          </li>
          <li>
            <NavLink
              exact={true}
              activeClassName="active"
              to="/city-break-locations"
            >
              CityBreakLocations
            </NavLink>
          </li>
        </ul>
      </aside>
      <div className="container column is-10">
        {renderRoutes(routes as RouteConfig[])}
      </div>
    </div>
  </BrowserRouter>
)
