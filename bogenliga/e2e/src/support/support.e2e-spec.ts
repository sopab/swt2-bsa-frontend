import {Support} from './support.po';
import {HomePage} from '../home/home.po';
import {SettingsOverview} from '../settings/overview/overview.po';
import {Sidebar} from '../sidebar/sidebar.po';
import {SettingsDetails} from '../settings/details/details.po';

describe('Support', () => {
  let support: Support;
  let home: HomePage;
  let settingsOverview: SettingsOverview;
  let sidebar: Sidebar;
  let settingsDetails: SettingsDetails;

  beforeEach(() => {
    support = new Support();
    support.navigateToHome();
  });

  it('should exist', () => {
    expect(support.getSupport()).toBeTruthy();
  });

  it('should display Support', () => {
    expect(support.getParagraph()).toBeTruthy();
  });

  it('should display Logos', () => {
    expect(support.getLogos()).toBeTruthy();
  });

  it('should be visible on all pages', () => {
    // Home
    home = new HomePage();
    home.navigateToHome();
    expect(support.isSupportPresent()).toBeTruthy();
    // Verwaltung

    // Wettkaempfe

    // Sportjahresplan

    // Login

    // Settings Overview
    settingsOverview = new SettingsOverview();
    settingsOverview.navigateToSettingsOverview();
    expect(support.isSupportPresent()).toBeTruthy();
    // Settings Details
    settingsDetails = new SettingsDetails();
    settingsDetails.navigateToSettingsDetails();
    expect(support.isSupportPresent()).toBeTruthy();
  });
});
