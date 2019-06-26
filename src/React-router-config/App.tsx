import 'bulma/css/bulma.css'
import * as React from 'react'
import {
  renderRoutes,
  RouteConfig,
  RouteConfigComponentProps,
} from 'react-router-config'
import { BrowserRouter, NavLink } from 'react-router-dom'
import { MealTypeList } from '../Meals/MealList'
import { MealsTypeList } from '../MealType/MealList'

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
import { GroupActivityList } from '../Group-Activities/ActivityList'
import { GroupActivityDetailsList } from '../Group-ActivityDetails/ActivityDetailsList'
import { GroupActivityOptionList } from '../Group-ActivityOptions/ActivityOptionList'
import { GroupOptionAvailabilityList } from '../Group-OptionAvailabilities/OptionAvailabilityList'
import { GroupActivityCategoryList } from '../Group-ActivityCategories/ActivityCategoryList'

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
        path: '/meal-types',
        exact: true,
        component: MealsTypeList,
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
      {
        path: '/group-activity',
        exact: true,
        component: GroupActivityList,
      },
      {
        path: '/group-activity-details',
        exact: true,
        component: GroupActivityDetailsList,
      },

      {
        path: '/group-activity-option',
        exact: true,
        component: GroupActivityOptionList,
      },
      {
        path: '/group-option-availability',
        exact: true,
        component: GroupOptionAvailabilityList,
      },
      {
        path: '/group-activity-category',
        exact: true,
        component: GroupActivityCategoryList,
      },
    ],
  },
]

export const AppRoutes = () => (
  <BrowserRouter>
    <div className="main-content columns ">
      <aside className="column is-2 ">
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
          <li>
            <NavLink exact={true} activeClassName="active" to="/meal-types">
              MealTypes
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

        <div className="has-text-info is-size-5">Group Activities</div>
        <ul className="menu-list">
          <li>
            <NavLink activeClassName="active" to="/group-activity">
              GroupActivity
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/group-activity-details">
              GroupActivityDetails
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/group-activity-option">
              GroupActivityOption
            </NavLink>
          </li>

          <li>
            <NavLink activeClassName="active" to="/group-option-availability">
              GroupOptionAvailability
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/group-activity-category">
              GroupActivityCategory
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
