/* ===== Zeste de Savoir ====================================================
   Truncates too long biographies on profile pages, with a link to see the
   whole bio.
   ---------------------------------
   Author: Amaury Carrade
   ========================================================================== */

(function($, undefined) {
    "use strict";

    var $bioContainer = $("body.userprofilepage .user-bio-and-activity .bio-container");
    if (!$bioContainer) return; // We are not on a profile page

    var $bioTextContainer = $bioContainer.find(".message-content");
    var $bioOverflowToggleHandle = $bioContainer.find(".biography-overflow");
    var $bioOverflowToggleLabel = $bioOverflowToggleHandle.find("p");

    console.log($bioTextContainer[0].scrollHeight, $bioTextContainer.innerHeight(), $bioTextContainer[0].scrollHeight - $bioTextContainer.innerHeight());

    // We detect overflow by comparing the scroll height (equal to the whole
    // size, without max-width) to the inner height (equal to the visible size).
    // But we must accept a margin as non-overflowing blocks may have a slightly
    // bigger scroll height (e.g. 148 vs 147.6).
    if ($bioTextContainer[0].scrollHeight - $bioTextContainer.innerHeight() > 10)
    {
        console.log("Bio overflow");
        $bioContainer.addClass("too-long-biography");
    }
    else
    {
        // If overflow was not detected, we ensure that the whole biography is
        // shown, as for edge cases, the end of the biography may be slightly
        // cut without link to show it full.
        $bioContainer.addClass("full-biography");
    }

    $bioOverflowToggleHandle.on("click", function()
    {
        $bioContainer.toggleClass("full-biography");

        var oldLabel = $bioOverflowToggleLabel.text();

        $bioOverflowToggleLabel.text($bioOverflowToggleLabel.attr("data-other-label"));
        $bioOverflowToggleLabel.attr("data-other-label", oldLabel);
    });
})(jQuery);