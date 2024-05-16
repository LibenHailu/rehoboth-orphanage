import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentBenefitItem extends Schema.Component {
  collectionName: 'components_component_benefit_items';
  info: {
    displayName: 'BenefitItem';
  };
  attributes: {
    logoId: Attribute.String;
    title: Attribute.String;
    description: Attribute.Text;
  };
}

export interface LayoutBenefitsSection extends Schema.Component {
  collectionName: 'components_layout_benefits_sections';
  info: {
    displayName: 'BenefitsSection';
  };
  attributes: {
    heading: Attribute.String;
    subHeading: Attribute.Text;
    BenefitItem: Attribute.Component<'component.benefit-item', true>;
  };
}

export interface LayoutHeroSection extends Schema.Component {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'HeroSection';
  };
  attributes: {
    heading: Attribute.String;
    subHeading: Attribute.Text;
    image: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'component.benefit-item': ComponentBenefitItem;
      'layout.benefits-section': LayoutBenefitsSection;
      'layout.hero-section': LayoutHeroSection;
    }
  }
}
