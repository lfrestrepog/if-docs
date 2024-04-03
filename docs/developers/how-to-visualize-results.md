---
sidebar-position: 4
---

# How to visualize results

_(for any questions / help needed on IF visualization please raise an issue here: [IF issues](https://github.com/Green-Software-Foundation/if/issues))_

There are currently 2 ways to visualize Impact Framework outputs:
1. Using the **Simple HTML Exporter plugin**. (NOT CURRENTLY WORKING! This plugin was broken by an IF refactor and is not yet fixed.)
2. Using **Grafana**.

**Grafana** is the more standardized method for visualization. It also provides much more control over what's being visualized and how. Nevertheless, it requires some setting up.


## Grafana

(See also https://grafana.com/)

**Grafana** is an open source analytics & monitoring solution for every database.

One of its main features is the ability to create dashboards with various types of data visualizations.

Please follow these instructions [here](https://github.com/Green-Software-Foundation/if/blob/dev/grafana/IF_GRAFANA_SETUP.md) to set up a **Grafana** dashboard.

This method requires converting the resulting output yml into a CSV. The standard way to do so would be to use the [CSV export](https://github.com/Green-Software-Foundation/if-plugins/tree/main/src/lib/csv-export) plugin.

### Visualization example

![img.png](grafana-sample.png)
