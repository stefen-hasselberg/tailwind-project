import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TailwindcssProjectWebPartStrings';
import TailwindcssProject from './components/TailwindcssProject';
import { ITailwindcssProjectProps } from './components/ITailwindcssProjectProps';

export interface ITailwindcssProjectWebPartProps {
  description: string;
}

export default class TailwindcssProjectWebPart extends BaseClientSideWebPart<ITailwindcssProjectWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITailwindcssProjectProps> = React.createElement(
      TailwindcssProject,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
