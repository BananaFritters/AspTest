using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Roka3Website.Controllers
{
    /// <summary>
    /// API controller for utility network data.
    /// In production, this would query PostGIS or proxy to a Martin tile server.
    /// </summary>
    [Route("api/[controller]")]
    public class NetworkController : Controller
    {
        [HttpGet("summary")]
        public IActionResult GetNetworkSummary()
        {
            return Ok(new
            {
                pipes = new
                {
                    total = 15,
                    totalLength_km = 8.74,
                    byMaterial = new Dictionary<string, int>
                    {
                        { "PVC", 5 },
                        { "Steel", 3 },
                        { "Ductile Iron", 2 },
                        { "HDPE", 3 },
                        { "Cast Iron", 2 }
                    },
                    byStatus = new Dictionary<string, int>
                    {
                        { "Active", 12 },
                        { "Closed", 1 },
                        { "Maintenance", 1 },
                        { "Abandoned", 1 }
                    }
                },
                valves = new { total = 10, open = 9, closed = 1 },
                hydrants = new { total = 6, active = 5, outOfService = 1 },
                meters = new { total = 6, active = 5, disconnected = 1 },
                facilities = new { pumpStations = 1, reservoirs = 1 },
                martinTileServer = new
                {
                    configured = false,
                    url = (string)null,
                    hint = "Configure Martin at /api/tiles for live PostGIS vector tiles"
                }
            });
        }

        [HttpGet("health")]
        public IActionResult Health()
        {
            return Ok(new { status = "ok", timestamp = DateTime.UtcNow, version = "1.0.0" });
        }
    }
}
